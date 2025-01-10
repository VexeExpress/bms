import dayjs from "dayjs";

export const formatTime = (time: string) => {
    return dayjs(time, "HH:mm:ss").format("HH:mm");
};