import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { Platform } from 'react-native';
import {
  ANDROID_API_BASE_URL,
  INTERNAL_SERVER_ERROR,
  IOS_API_BASE_URL,
  UNAUTHORIZED_ERROR,
} from '@shared/constants';
import type { HttpRequest, IHttpClient } from './http-client.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '@shared/store/user.store';

const getBaseUrl = () => {
  return Platform.select({
    ios: IOS_API_BASE_URL,
    android: ANDROID_API_BASE_URL,
  });
};

export const BASE_URL = getBaseUrl();

export class HttpClient implements IHttpClient {
  private api: AxiosInstance; // instancia isolada do axios
  private isRefreshing = false;

  private constructor() {
    this.api = axios.create({ baseURL: BASE_URL });
    this.setupInterceptors();
  }

  static create() {
    return new HttpClient();
  }

  private setupInterceptors() {
    // adiciona o token JWT nos headers de Authorization a partir do AsyncStorage
    this.api.interceptors.request.use(
      async (config) => {
        // busca os dados do usuário no AsyncStorage
        const userData = await AsyncStorage.getItem('marketplace-auth');

        // se existir dados do usuário, transforma em JSON
        if (userData) {
          const {
            state: { token },
          } = JSON.parse(userData);

          // passa o token para os headers de Authorization
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    // busca o token e refreshToken para revalidar a sessão do usuário
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // se der erro 401 ou o token estiver expirado
        if (
          error.response?.status === UNAUTHORIZED_ERROR &&
          error.response?.data?.message === 'Token expirado' &&
          !this.isRefreshing
        ) {
          // marca que está em processo de refresh
          this.isRefreshing = true;

          try {
            // busca os dados do usuário no AsyncStorage
            const userData = await AsyncStorage.getItem('marketplace-auth');

            // erro se não houver dados do usuário autenticado
            if (!userData) throw new Error('Usuário não autenticado');

            // extrai o refreshToken dos dados do usuário
            const {
              state: { refreshToken },
            } = JSON.parse(userData);

            // erro se não houver o refreshToken
            if (!refreshToken) throw new Error('Refresh token não encontrado');

            // envia o refreshToken para a rota de refresh (com axios puro para evitar loops)
            const { data: response } = await axios.post(
              `${BASE_URL}/auth/refresh`,
              {
                refreshToken,
              },
            );

            // obtém os dados atuais do usuário e atualiza com os novos tokens
            const currentUserData = JSON.parse(userData);

            // atualiza o objeto currentUserData com os novos tokens recebidos da API
            currentUserData.state.token = response.token;
            currentUserData.state.refreshToken = response.refreshToken;

            // salva os novos tokens no AsyncStorage
            await AsyncStorage.setItem(
              'marketplace-auth',
              JSON.stringify(currentUserData),
            );

            // atualiza o header Authorization com o novo token
            originalRequest.headers.Authorization = `Bearer ${response.token}`;

            // reenvia a requisição que falhou  (com axios puro para evitar loops)
            return axios(originalRequest);
          } catch (err) {
            this.handleUnauthorized();
            return Promise.reject(
              new Error('Sessão expirada, faça o login novamente'),
            );
          } finally {
            this.isRefreshing = false;
          }
        }

        if (error.response && error.response.data) {
          return Promise.reject(new Error(error.response.data.message));
        } else {
          return Promise.reject(new Error('Falha na requisição'));
        }
      },
    );
  }

  // desloga o usuário que não está autenticado
  private async handleUnauthorized() {
    const { logout } = useUserStore.getState();

    delete this.api.defaults.headers.common.Authorization;
    logout();
  }

  // client  HTTP responsável pelas requisições ao backend
  async request<TResponse, TBody = unknown>(props: HttpRequest<TBody>) {
    const { endpoint, method, body, headers } = props;

    try {
      const { data } = await this.api.request<TResponse>({
        url: endpoint, // BASE_URL já vem por padrão (pelo this.api), passa apenas os endpoints
        method,
        data: body,
        headers,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      console.error('HTTP ERROR', {
        message: error.message,
        code: error.code,
        response: error.response,
        config: error.config,
      });
      const status = error.response?.status || INTERNAL_SERVER_ERROR;
      const message = error.response?.data || error.message;
      throw new Error(`Request failed with status ${status}: ${message}`);
    }
  }
}
