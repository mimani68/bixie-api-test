import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export async function hashPassword(plainText: string) {

    const salt = genSaltSync(10);
    const hashPass = hashSync(plainText, salt);

}

export async function CheckPassword(plainText: string, hash: string) : Promise<boolean> {
    const isMatch = compareSync(plainText, hash)

    if (isMatch) {
        console.log('Matched')
        return true

    } else {
        console.log('Not Matchs')
        return false
    }
}