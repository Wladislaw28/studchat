import bcrypt from 'bcrypt';

export default (password: string | number = "") => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash: string) => {
            if (err) {
                return reject(err);
            }
            resolve(hash);
        })
    })
}