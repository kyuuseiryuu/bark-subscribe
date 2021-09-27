import axios, {AxiosInstance} from "axios";

export interface BarkMessageConfig {
  title: string;
  automaticallyCopy: 1 | 0,
  copy: string;
  group: string;
  isArchive: 1 | 0;
  url: string;
  autoCopy: 1 | 0;
  sound: string;
  icon: string;
}

export class Bark {
  private instance: AxiosInstance = axios.create({
    validateStatus: status => true,
  });
  constructor(server: string,key: string) {
    this.instance.interceptors.request.use(c => ({
      ...c,
      baseURL: `${server}/${key}`,
    }));
  }
  notify(body: string, config?: Partial<BarkMessageConfig>) {
    const message = [
      config?.title ? encodeURIComponent(config?.title) : '',
      encodeURIComponent(body),
    ].filter(Boolean).join('/');
    this.instance.get(`/${message}`, {
      params: config,
    }).then();
  }
}