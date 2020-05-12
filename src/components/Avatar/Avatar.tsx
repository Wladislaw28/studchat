import React from "react";
import generateAvatarFromHash from "../../utils/helper/generateAvatarFromHash";

import "./Avatar.scss";

const Avatar = ({ user }: any) => {
    if (user.avatar) {
        return (
            <img
                className="avatar"
                src={user.avatar}
                alt={`Avatar ${user.fullname}`}
            />
        );
    } else {
        const { color, colorLighten } = generateAvatarFromHash(user._id);
        const firstChar = user.fullname[0].toUpperCase();
        return (
            <div
                style={{
                    background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
                }}
                className="avatar avatar--symbol"
            >
                {firstChar}
            </div>
        );
    }
};

export default Avatar;