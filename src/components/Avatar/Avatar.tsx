import React from 'react';
import { generateAvatarFromHash, IColorsForAvatar } from '../../utils/helper/generateAvatarFromHash';

import './Avatar.scss';

interface IAvatarProps {
    user: any;
}

const Avatar = ({ user }: IAvatarProps): JSX.Element => {
    if (user.avatar) {
        return <img className="avatar" src={user.avatar} alt={`${user.fullName} avatar`} />
    } else {
        const { color, colorLighter }: IColorsForAvatar = generateAvatarFromHash(user._id);
        const firstCharFullName: string = user.fullName.substring(0, 1).toUpperCase();
        return (
            <div className="avatar avatar--symbol"
                style={{
                    background: `linear-gradient(135deg, ${color} 0%, ${colorLighter} 96.52%)`
                }}>{firstCharFullName}
            </div>);
    }
};

export default Avatar;