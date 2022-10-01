import { AxiosResponse } from "axios";
import { SWRConfiguration } from "swr";
import { http } from "../axios/http";
import { FunctionComponent, PropsWithChildren } from "react";
import { SWRConfig } from "swr";

const config: SWRConfiguration = {
  fetcher: (url: string, params: unknown) =>
    http
      .get(url, {
        params,
      })
      .then(({ data }: AxiosResponse) => data),
};

const Swr: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <SWRConfig value={config}>{children}</SWRConfig>
);

export default Swr;
