import { TestInfo } from "@playwright/test";

// require('dotenv').config(); // Включить при запуске локально

function getCurrentDate(): string{
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // месяцы начинаются с 0
    const year = today.getFullYear();

    return `${day}.${month}.${year}`;
}

function getCurrentTime(): string {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}

export async function getMessage(testInfo: TestInfo) {
    let resultMessage = '';
    let hashTag = '';
    const data = getCurrentDate();
    const time = getCurrentTime();

    if (testInfo.status !== testInfo.expectedStatus) {
        resultMessage = '❌ Запуск теста завершен ПРОВАЛОМ!\n'
                        + `${testInfo.error?.message}\n`;
        hashTag = '#провал';
    }
    else {
        resultMessage = '✅ Запуск теста завершен УСПЕШНО!\n';
        hashTag = '#успех';
    }

    let message = resultMessage
                + `🕕 Время выполнения -- ${ testInfo.duration } ms \n`
                + '\n'
                + `📅 Дата запуска -- ${ data }\n`
                + `🕕 Время запуска -- ${ time }\n`
                + '\n'
                + `🐭 Вот ссылка -- https://github.com/${ process.env.LINK_GIT }/actions/runs/${ process.env.CI_ID }\n`
                + '\n'
                + '✿ ------------------------------------- ✿\n'
                + hashTag;
    
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