import { TestInfo } from "@playwright/test";
import { getCurrentDate } from "./getCurrentDate";
import { getCurrentTime } from "./getCurrentTime";
import { getTestDuration } from "./getTestDuration";

// require('dotenv').config(); // Включить при запуске локально

export async function getMessage(testInfo: TestInfo) {
    let resultMessage = '';
    let hashTag = '';

    const data = getCurrentDate();
    const time = getCurrentTime();

    const duration = getTestDuration(testInfo.duration);

    if (testInfo.status !== testInfo.expectedStatus) {
        const errorMessage = testInfo.error?.message ? testInfo.error?.message.replaceAll(/(^\[\d+m)|(\s\[\d+m$)/g, "") : undefined;
        
        resultMessage = '❌ Запуск теста завершен ПРОВАЛОМ!\n'
                        + `${ errorMessage }\n`;
        hashTag = '#провал';
    }
    else {
        resultMessage = '✅ Запуск теста завершен УСПЕШНО!\n';
        hashTag = '#успех';
    }

    let message = resultMessage
                + `🕕 Время выполнения -- ${ duration } \n`
                + '\n'
                + `📅 Дата запуска -- ${ data }\n`
                + `🕕 Время запуска -- ${ time }\n`
                + '\n'
                + `🐭 Вот ссылка -- https://github.com/${ process.env.LINK_GIT }/actions/runs/${ process.env.CI_ID }\n`
                + '\n'
                + '✿ ------------------ ✿\n'
                + hashTag;

    await fetch(`https://api.telegram.org/bot${ process.env.TEST_TELEGRAM_TOKEN }/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: process.env.TEST_TELEGRAM_CHAT_ID,
            text: message,
        }),
    });
}
