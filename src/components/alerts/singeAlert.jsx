import {React} from 'react';

export default function SingleAlert ({className, type, text}) {
    let icon;
    switch (type) {
        case 'danger':
            icon = <i className="fa fa-times-circle"></i>;
            break;
        case 'success':
            icon = <i className="fa fa-check-circle"></i>;
            break;
        default:
            icon = null;
            break;
    }

    return (
        <div className={'alert alert-' + type + ' ' + className} role="alert">
            {icon} {text}
        </div>
    )
}