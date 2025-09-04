import { TestInfo, Page } from "@playwright/test";

// require('dotenv').config(); // Включить при запуске локально

export async function getMessage(testInfo: TestInfo, page: Page) {
    let resultMessage = '';

    if (testInfo.status !== testInfo.expectedStatus)
        resultMessage = '\n❌❌❌❌ Запуск теста завершен ПРОВАЛОМ! ❌❌❌❌\n'
                        + testInfo.error?.message;
    else
        resultMessage = '\n✅✅✅✅ Запуск теста завершен УСПЕШНО! ✅✅✅✅\n';

    let message = 'Привет! 🐭\n' 
                + resultMessage
                + `\n🕕 Время выполнения -- ${ testInfo.duration } ms \n`
                + `\nВот ссылка -- ${ process.env.LINK_GIT } `;
    
    console.log('>>>>>>> ' + message);

    fetch(`https://api.telegram.org/bot${ process.env.TEST_TELEGRAM_TOKEN }/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: process.env.TEST_TELEGRAM_CHAT_ID,
            text: message,
        }),
    });

//     const response = await page.request.post(`https://api.telegram.org/bot${ process.env.TEST_TELEGRAM_TOKEN }/sendMessage`, {
//       data: JSON.stringify({
//             chat_id: process.env.TEST_TELEGRAM_CHAT_ID,
//             text: message,
//         })
//     });
//     console.log('<<<<<<< resp = ' + response.json());
// }