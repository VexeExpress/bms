import dayjs from "dayjs";
export const formatToDate = (
  date: string | Date | null | undefined,
): string => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};
export const formatToDate_NgayTN = (
  date: string | Date | null | undefined,
): string => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};
