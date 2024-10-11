import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [];

const moduleFiles: Record<
  string,
  {
    [key: string]: any;
  }
> = import.meta.glob('./*.ts', { eager: true });

Object.keys(moduleFiles).map((ele: any) => {
  const value = moduleFiles[ele].default || {};
  if (Array.isArray(value)) routes.push(...value);
  else routes.push(value);
});

export default routes;
