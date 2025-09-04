import { TestInfo } from "@playwright/test";

// require('dotenv').config(); // Включить при запуске локально

export async function getMessage(testInfo: TestInfo) {
    let resultMessage = '';

    if (testInfo.status !== testInfo.expectedStatus)
        resultMessage = '❌ Запуск теста завершен ПРОВАЛОМ!\n'
                        + `${testInfo.error?.message}\n`;
    else
        resultMessage = '✅ Запуск теста завершен УСПЕШНО!\n';

    let message = resultMessage
                + `🕕 Время выполнения -- ${ testInfo.duration } ms \n`
                + '\n'
                + '📅 Дата запуска -- 21/09/2025\n'
                + '🕕 Время запуска -- 10:00:00\n'
                + '\n'
                + `🐭 Вот ссылка -- https://github.com/${ process.env.LINK_GIT }/actions/runs/${ process.env.CI_ID }\n`
                + '\n'
                + '✿ ------------------------------------- ✿\n'
                + '#успех';
    
    console.log(message);

    const response = await fetch(`https://api.telegram.org/bot${ process.env.TEST_TELEGRAM_TOKEN }/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: process.env.TEST_TELEGRAM_CHAT_ID,
            text: message,
        }),
    });

    console.log('<<<<<<< resp = ' + response.body);
}