import { enc, MD5 } from 'crypto-js';

// 在 apiUtils.ts 文件中定义一个函数用于 MD5 加密
export const md5Encrypt = (data: string): string => {
    return MD5(data).toString(enc.Hex);
};
