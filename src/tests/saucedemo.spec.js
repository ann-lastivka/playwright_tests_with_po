import { expect } from "@playwright/test";
import { test } from "../fixtures/base";

test.beforeEach(
  async (
    /** @type {{ app: import('../pages/Application').Application }} */ { app }
  ) => {
    await app.login.navigate();
    await app.login.performLogin();
  }
);

test.describe("Saucedemo app basic tests", () => {
  test("should login successfully", async (/** @type {{ app: import('../pages/Application').Application }} */ {
    app,
  }) => {
    await expect(app.inventory.headerTitle).toBeVisible();

    expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(
      1
    );
  });

  test("should add and remove product from the cart", async (/** @type {{ app: import('../pages/Application').Application }} */ {
    app,
  }) => {
    await app.inventory.addItemToCartById(0);
    expect(await app.inventory.getNumberOfItemsInCart()).toBe("1");

    await app.inventory.shoppingCart.click();
    expect(await app.shoppingCart.cartItems.count()).toBeGreaterThanOrEqual(1);

    await app.shoppingCart.removeCartItemById(0);
    await expect(app.shoppingCart.cartItems).not.toBeAttached();
  });
});

test.describe("Sorting items", () => {
  test('should sort "Name (A to Z)" by default', async (/** @type {{ app: import('../pages/Application').Application }} */ {
    app,
  }) => {
    await app.inventory.sortingButton.isVisible();
    await app.inventory.sortingButton.selectOption("az");
    const items = await app.inventory.inventoryItems;
    const itemTitles = await app.inventory.getElementContent(items);
    const sortedTitles = [...itemTitles].sort();
    expect(itemTitles).toEqual(sortedTitles);
  });

  test('should sort "Name (Z to A)"', async (/** @type {{ app: import('../pages/Application').Application }} */ {
    app,
  }) => {
    await app.inventory.sortingButton.selectOption("za");
    const items = await app.inventory.inventoryItems;
    const itemTitles = await app.inventory.getElementContent(items);
    const sortedTitles = [...itemTitles].sort((one, two) =>
      one > two ? -1 : 1
    );
    expect(itemTitles).toEqual(sortedTitles);
  });

  test('should sort "Price (low to high)"', async (/** @type {{ app: import('../pages/Application').Application }} */ {
    app,
  }) => {
    await app.inventory.sortingButton.selectOption("lohi");
    const items = await app.inventory.inventoryPrices.allTextContents();
    const prices = items.map((price) => parseFloat(price.replace("$", "")));
    const sortedPrices = [...prices].sort(function (a, b) {
      return a - b;
    });
    expect(prices).toEqual(sortedPrices);
  });

  test('should sort "Price (high to low)"', async (/** @type {{ app: import('../pages/Application').Application }} */ {
    app,
  }) => {
    await app.inventory.sortingButton.selectOption("hilo");
    const items = await app.inventory.inventoryPrices.allTextContents();
    const prices = items.map((price) => parseFloat(price.replace("$", "")));
    const sortedPrices = [...prices].sort(function (a, b) {
      return b - a;
    });
    expect(prices).toEqual(sortedPrices);
  });
});
