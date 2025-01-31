import { LightningElement, wire, track } from 'lwc';
import getJobPostings from '@salesforce/apex/JobPostingController.getJobPostings';

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'CTC/Budget', fieldName: 'CTC_Budget__c', type: 'number' },
    { label: 'Employment Type', fieldName: 'Employment_Type__c', type: 'text' },
    { label: 'Experience', fieldName: 'Experience__c', type: 'number' },
    { label: 'Job Description', fieldName: 'Job_Description__c', type: 'text' },
    { label: 'Key Responsibilities', fieldName: 'Key_Responsibilities__c', type: 'text' },
    { label: 'Location', fieldName: 'Location__c', type: 'text' },
    { label: 'Notice Period', fieldName: 'Notice_Period__c', type: 'number' },
    { label: 'Role', fieldName: 'Role__c', type: 'text' }
];

export default class JobPostings extends LightningElement {
    @track jobPostings = [];
    @track columns = columns;
    @track isLoading = true;
    @track isModalOpen = false;

    @wire(getJobPostings)
    wiredJobPostings({ error, data }) {
        if (data) {
            this.jobPostings = data;
            this.isLoading = false;
        } else if (error) {
            console.error('Error fetching job postings', error);
            this.isLoading = false;
        }
    }
    // Open the modal
    openModal() {
        this.isModalOpen = true;
    }

    // Close the modal
    closeModal() {
        this.isModalOpen = false;
    }

    // Handle form submission
    handleSubmit(event) {
        event.preventDefault(); // Stop the default form submission
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    // Handle success after record creation
    handleSuccess(event) {
        this.closeModal(); // Close the modal
        this.isLoading = true; // Show loading spinner
        // Refresh the data table
        getJobPostings()
            .then((data) => {
                this.jobPostings = data;
                this.isLoading = false;
            })
            .catch((error) => {
                console.error('Error refreshing job postings', error);
                this.isLoading = false;
            });
    }

}