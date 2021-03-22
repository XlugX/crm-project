import { texts } from './texts';

const T = ({ id, local }) => {
    if (!id) return null;

    const text = texts[id];

    return text[local] || id;
}

T.defaultProps = {
    local: 'ru'
}

export default T;
