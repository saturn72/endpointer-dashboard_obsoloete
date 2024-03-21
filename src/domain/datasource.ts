type DatasourceType = "json" | "csv" | "xlsx" | "xml" | "sql" | "nosql";
type DatasourceMimeType = "application/json" | "text/csv" | "application/xml" | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
export type DatasourceFileInfo = {
    type: DatasourceType,
    accept: DatasourceMimeType,
};

export const SupportedDatasourceFileInfos: DatasourceFileInfo[] = [
    { type: 'json', accept: 'application/json' },
    { type: 'csv', accept: 'text/csv' },
    { type: 'xml', accept: 'application/xml' },
    {
        type: 'xlsx',
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }];


/**
 * admin - allowed to do anything, is the creator
 * maintainer - allowed to change some attributes (update file, update alias etc.)
 * reviewer - reviews datasource changes
 */
export type DatasourceUserRole = "admin" | "maintainer" | "reviewer";