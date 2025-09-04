import { FrameLocator, Page } from "@playwright/test";
import { LOCATOR } from "./locators";

export function getFrame(page: Page): FrameLocator {
    return page.locator(LOCATOR.IFRAME).contentFrame();
}