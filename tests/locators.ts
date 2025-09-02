export const LOCATOR = {
    'DIV': 'div',
    'IFRAME': '[id="__next"] iframe',
    'SELECT_DATA': '[data-handler="selectDay"]:nth-child(2)',
    'SELECT_TICKET': '.ticket-type__button.plus > .ticket-type__icon > path',
    'EMAIL_INPUT': '[id="user_email"]',
    'NAME_INPUT': '[id="user_first"]',
    'SECOUND_NAME_INPUT': '[id="user_second"]',
    'RETRY_EMAIL_INPUT': '[id="retry_user_email"]',
    'PHONE_INPUT': '[id="user_phone"]',
    'AGREE': 'i',
};

export const ROLE = {
    'BANNER': 'banner' as const,
    'BOTTON': 'button' as const,
    'LISTITEM': 'listitem' as const,
};

export const TEXT = {
    'BUY_TICKET': 'Купить билет',
    'NO_AUTH': 'Купить без авторизации',
    'TICKET_BOTTON': /^парк развлечений49 головокружительных аттракционов и 5 шоус 12:00 до 22:00Купить$/,
    'AGREE': 'Я согласен(на) на обработку персональных данных',
    'NEXT': 'Далее',
    'CHECK_URL': /https:\/\/buy-dreamisland-pay\.server\.paykeeper\.ru\/bill\/\d*/,
};
