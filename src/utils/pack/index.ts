import lzbase62 from 'lzbase62'

const pack = (value: any) => {
    return lzbase62.compress(JSON.stringify(value))
}

const unpack = (base62: string) => {
    return JSON.parse(lzbase62.decompress(base62))
}

export default {
    pack,
    unpack,
}