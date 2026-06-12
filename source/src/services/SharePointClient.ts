import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { SharePointRuntimeContext } from "../models/SharePointRuntimeContext";

export interface SharePointClient {
  getListItems<TItem extends Record<string, unknown>>(
    listTitle: string,
    selectFields: string[],
    top?: number
  ): Promise<TItem[]>;
}

export function createSharePointClient(context: SharePointRuntimeContext): SharePointClient {
  const sp = spfi().using(SPFx(context as never));
  return new PnPSharePointClient(sp);
}

class PnPSharePointClient implements SharePointClient {
  public constructor(private readonly sp: SPFI) {}

  public async getListItems<TItem extends Record<string, unknown>>(
    listTitle: string,
    selectFields: string[],
    top = 100
  ): Promise<TItem[]> {
    const items = this.sp.web.lists.getByTitle(listTitle).items;
    const query = selectFields.length > 0 ? items.select(...selectFields) : items;
    return query.top(top)<TItem[]>();
  }
}
