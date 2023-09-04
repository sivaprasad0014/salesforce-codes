import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' }
];

export default class AccountListLWC extends LightningElement {
    columns = columns;
    accountList;
    searchTerm = '';
    
    @track filteredAccounts;

    @wire(getAccountList)
    wiredAccountList({ error, data }) {
        if (data) {
            this.accountList = data;
            this.filterAccounts();
        } else if (error) {
            console.error(error);
        }
    }

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
        this.filterAccounts();
    }

    filterAccounts() {
        if (!this.accountList) {
            return;
        }
        const searchTermLC = this.searchTerm.toLowerCase();
        this.filteredAccounts = this.accountList.filter(account =>
            account.Name.toLowerCase().includes(searchTermLC)
        );
    }
}
