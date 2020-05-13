import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Time, Avatar, IconReaded } from '../../components';

import { Emoji } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'

import { convertCurrentTime } from '../../utils/helper/convertCurrentTime';

import audioSvg from 'assets/img/audio.svg';
import playSvg from 'assets/img/play.svg';
import pauseSvg from 'assets/img/pause.svg';

import './Message.scss';

interface IMessageProps {
    avatar: string;
    text?: string;
    date?: string;
    user?: any;
    attachments?: Array<any>;
    isTyping?: boolean;
    isReaded?: boolean;
    isMe?: boolean;
    audio?: string;
}

interface IAudioMessageProps {
    audioSrc: string
}

const AudioMessage = ({ audioSrc }: IAudioMessageProps): JSX.Element => {
    const audioEl: React.MutableRefObject<null> = useRef(null);

    const [isPlay, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    const togglePlay = (): void => {
        if (!isPlay) {
            (audioEl as any).current.play();
        } else {
            (audioEl as any).current.pause();
        }
    };

    useEffect(() => {
        (audioEl as any).current.volume = '0.01';
        (audioEl as any).current.addEventListener(
            "loadedmetadata",
            () => {
                setCurrentTime((audioEl as any).current.duration);
            },
            false
        );
        (audioEl as any).current.addEventListener(
            "playing",
            () => {
                setPlaying(true)
            },
            false
        );
        (audioEl as any).current.addEventListener(
            "ended",
            () => {
                setPlaying(false);
                setProgress(0);
                setCurrentTime(0);
            },
            false
        );
        (audioEl as any).current.addEventListener(
            "pause",
            () => {
                setPlaying(false)
            },
            false
        );
        (audioEl as any).current.addEventListener(
            "timeupdate",
            () => {
                const duration: number = ((audioEl as any).current && (audioEl as any).current.duration) || 0;
                setCurrentTime((audioEl as any).current.currentTime);
                setProgress(((audioEl as any).current.currentTime / duration) * 100);
            }
        )
    });

    return (
        <div className="message__audio">
            <audio ref={audioEl} src={audioSrc} preload="auto"></audio>
            <div className="message__audio-progress" style={{ width: progress + '%' }}></div>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={togglePlay}>
                        <img src={isPlay ? pauseSvg : playSvg}
                            alt={`${isPlay ? 'Pause audio' : 'Play audio'}`} />
                    </button>
                </div>
                <div className="message__audio-wave">
                    <img src={audioSvg} alt="Wave svg" />
                </div>
                <div className="message__audio-duration">
                    <span>{convertCurrentTime(currentTime)}</span>
                </div>
            </div>
        </div>
    )
}

const Message = ({ avatar, user, text, date, isMe, isReaded, attachments, audio, isTyping }: IMessageProps): JSX.Element => {
    return (
        <div className={classNames("message", {
            "message--isme": isMe,
            "message--is-typing": isTyping,
            "message--is-audio": audio,
            "message--image": attachments && attachments.length === 1
        })}>
            <div className="message__content">
                {(isMe && isReaded) && <IconReaded isMe={isMe} isReaded={isReaded} />}
                <div className="message__avatar">
                    {/* <Avatar user={user} /> */}
                    <img src={avatar} alt={`${avatar}- users avatar`} />
                </div>
                <div className="message__info">
                    {(text || audio || isTyping) &&
                        <div className="message__bubble">
                            {text && (
                                <p className="message__text">
                                    <Emoji emoji=":santa::skin-tone-3:" set="apple" size={16} />
                                </p>
                            )}
                            {text && <p className="message__text">{text}</p>}
                            {isTyping &&
                                <div className="message__is-typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            }
                            {!!audio && <AudioMessage audioSrc={audio} />}
                        </div>
                    }
                    {attachments &&
                        <div className="message__attachments">
                            {attachments.map((item) => (
                                <div className={attachments.length !== 1 ? 'message__attachments-items' : 'message__attachments-item'}>
                                    <img src={item.url} alt={item.filename} />
                                </div>
                            ))}
                        </div>}
                    {date && <Time dateProps={date} />}
                </div>
            </div>
        </div>
    )
};
export default Message;