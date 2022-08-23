import { IRouteProps } from '@/types/index';
import routers from '@/routers';

function findRoutePath(
  target: string = location.pathname,
  list: IRouteProps[] = routers,
  root?: IRouteProps
): IRouteProps[] | undefined {
  for (const i of list) {
    if (
      i.path === target ||
      // 动态:id路径的匹配
      (i.path?.includes(':id') && new RegExp(i.path?.replace(':id', '\\w*')).test(target))
    ) {
      if (root) return [root as IRouteProps, i];
      return [i];
    }
    if (i.routes instanceof Array) {
      const valuableRoot = i.type === 'group' ? undefined : i;
      const res = findRoutePath(target, i.routes, valuableRoot) as any[];
      if (res?.length) return res;
    }
  }
  return undefined;
}

export default findRoutePath;
