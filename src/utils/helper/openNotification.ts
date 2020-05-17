import { notification } from 'antd';

interface IOpenNotificationProps {
    text?: string;
    type: string;
    title: string
}
//@ts-ignore
export const openNotification = ({ text, type, title }: IOpenNotificationProps) => {notification[type]({
    message: title,
    description: text,
    duration: 3
})};