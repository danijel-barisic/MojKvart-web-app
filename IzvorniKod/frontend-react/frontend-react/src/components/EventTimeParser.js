function duration_parser(duration) {
    let ret_val = ''
    if (parseInt(duration / 60) < 10) ret_val += '0' + parseInt(duration / 60)
    else ret_val += parseInt(duration / 60)
    ret_val += ':'
    if (duration % 60 < 10) ret_val += '0' + duration % 60
    else ret_val += duration % 60
    return ret_val
}

export default duration_parser