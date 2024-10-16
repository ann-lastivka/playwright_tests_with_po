import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    sortingButton = this.page.locator('[data-test="product-sort-container"]');

    sortingOptionList = this.page.locator('select option');

    inventoryItems = this.page.locator('.inventory_item');

    inventoryPrices = this.page.locator('[data-test="inventory-item-price"]');
    
    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');
 
    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async getElementContent(elements) {
        return await elements.allTextContents(); 
    }

}
