import moment from "moment";

export const parseDate = (d: Date, format?: string) => moment(d).format(format || "DD/MM/YY HH:mm")