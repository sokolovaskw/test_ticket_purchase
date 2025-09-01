import { test, expect } from '@playwright/test';
import { fakeUser } from './fakeUser';

test('Проверка работоспособности системы покупки билетов', async ({ page }) => {
	await page.setViewportSize({ width: 1920, height: 1080 });

	await test.step('Переход на сайт мечты', async () => {
 		await page.goto('https://dreamisland.ru/');
	});
  
	await test.step('Переход к форме покупке билетов', async () => {
		await page.getByRole('banner').getByText('Купить билет').click();
		await page.locator('div').filter({ hasText: /^парк развлечений49 головокружительных аттракционов и 5 шоус 12:00 до 22:00Купить$/ }).getByRole('button').click();
	});

	await test.step('Выбор даты и билета', async () => {
		// page.locator('[id="__next"] iframe');

		await page.locator('[id="__next"] iframe').contentFrame().locator('[data-handler="selectDay"]:nth-child(2)').first().click();
		await page.locator('[id="__next"] iframe').contentFrame().locator('.ticket-type__button.plus > .ticket-type__icon > path').first().click();
		await page.locator('[id="__next"] iframe').contentFrame().getByRole('button', { name: 'Далее' }).click();
	});

	await test.step('Купить без авторизации', async () => {
 		await page.locator('[id="__next"] iframe').contentFrame().getByText('Купить без авторизации').click();
	});

	await test.step('Заполнение формы покупки', async () => {
		await page.locator('[id="__next"] iframe').contentFrame().locator('[id="user_email"]').fill(fakeUser.fakeEmail);
		await page.locator('[id="__next"] iframe').contentFrame().locator('[id="user_first"]').fill(fakeUser.fakeName);
		await page.locator('[id="__next"] iframe').contentFrame().locator('[id="user_second"]').fill(fakeUser.fakeSecondName);
		await page.locator('[id="__next"] iframe').contentFrame().locator('[id="retry_user_email"]').fill(fakeUser.fakeEmail);
		await page.locator('[id="__next"] iframe').contentFrame().locator('[id="user_phone"]').fill(fakeUser.fakePhoneNumber);
	});

	await test.step('Согласие на обработку персональных данных', async () => {
 		await page.locator('[id="__next"] iframe').contentFrame().getByRole('listitem').filter({ hasText: 'Я согласен(на) на обработку персональных данных' }).locator('i').click();
		await page.locator('[id="__next"] iframe').contentFrame().getByRole('button', { name: 'Далее' }).click();
	});

	await test.step('Проверка вызова формы оплаты', async () => {
 		await page.waitForURL(/https:\/\/buy-dreamisland-pay\.server\.paykeeper\.ru\/bill\/\d*/);
		await expect(page).toHaveURL(/https:\/\/buy-dreamisland-pay\.server\.paykeeper\.ru\/bill\/\d*/);
	});

});
