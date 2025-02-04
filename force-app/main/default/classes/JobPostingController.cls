public with sharing class JobPostingController {
    @AuraEnabled(cacheable=true)
    public static List<Job_Posting__c> getJobPostings() {
        return [SELECT Id, CTC_Budget__c, Employment_Type__c, Experience__c, 
                       Job_Description__c, Key_Responsibilities__c, Location__c, 
                       Notice_Period__c, Role__c, Additional_Notes__c	
                FROM Job_Posting__c];
    }
}