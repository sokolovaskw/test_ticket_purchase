import { test, expect } from '@playwright/test';
import { fakeUser } from '../commonData/fakeUser';
import { LOCATOR, ROLE, TEXT } from '../locators/locators';
import { getMessage } from '../commonFunctions/reportBot';
import { getFrame } from '../locators/getFrame';

test.describe('Cистема покупки билетов', () => {
	test('Проверка работоспособности системы покупки билетов', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });

		await test.step('Переход на сайт мечты', async () => {
			await page.goto('/');
		});
	
		await test.step('Переход к форме покупке билетов', async () => {
			await page.getByRole(ROLE.BANNER).getByText(TEXT.BUY_TICKET).click();
			await page.locator(LOCATOR.DIV).filter({ hasText: TEXT.TICKET_BOTTON }).getByRole(ROLE.BOTTON).click();
		});

		await test.step('Выбор даты и билета', async () => {
			// page.locator(LOCATOR.IFRAME);

			await getFrame(page).locator(LOCATOR.SELECT_DATA).first().click();
			await getFrame(page).locator(LOCATOR.SELECT_TICKET).first().click();
			await getFrame(page).getByRole(ROLE.BOTTON, { name: TEXT.NEXT }).click();
		});

		await test.step('Купить без авторизации', async () => {
			await page.locator(LOCATOR.IFRAME).contentFrame().getByText(TEXT.NO_AUTH).click();
		});

		await test.step('Заполнение формы покупки', async () => {
			await getFrame(page).locator(LOCATOR.EMAIL_INPUT).fill(fakeUser.fakeEmail);
			await getFrame(page).locator(LOCATOR.NAME_INPUT).fill(fakeUser.fakeName);
			await getFrame(page).locator(LOCATOR.SECOUND_NAME_INPUT).fill(fakeUser.fakeSecondName);
			await getFrame(page).locator(LOCATOR.RETRY_EMAIL_INPUT).fill(fakeUser.fakeEmail);
			await getFrame(page).locator(LOCATOR.PHONE_INPUT).fill(fakeUser.fakePhoneNumber);
		});

		await test.step('Согласие на обработку персональных данных', async () => {
			await getFrame(page).getByRole(ROLE.LISTITEM).filter({ hasText: TEXT.AGREE }).locator(LOCATOR.AGREE).click();
			await getFrame(page).getByRole(ROLE.BOTTON, { name: TEXT.NEXT }).click();
		});

		await test.step('Проверка вызова формы оплаты', async () => {
			await page.waitForURL(TEXT.CHECK_URL);
			await expect(page).toHaveURL(TEXT.CHECK_URL);
		});

	});

	test.afterEach(async ({}, testInfo) => {
		await getMessage(testInfo);
	});

});
