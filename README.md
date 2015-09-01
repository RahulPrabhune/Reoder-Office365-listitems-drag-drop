# Reoder-SharePoint-listitems-drag-drop

>Are you looking for client side solution which empowers users to reorder list items or documents by just drag and drop? Follow me and you will get this done within minutes in your project.

##Prerequisites

1. jquery-1.7.1 and above 
2. angular 1.4.x
3. angular-drag-and-drop-lists
4. Custom List with columns - ID, Title, index(Number type) required

##Logic to save newly ordered list of items

###Below are the steps to save the newly created order of list items by user by drag and drop.
1. Get list items to display by - orderby=index
2. After drag and drop use ng-repeat $index to get the newly ordered list items and do batch update by $index to index column in the list for all the items.
3. After new item is created, take its Id and update the index column for that item.

You can contact me at contact@rahulprabhune.com, incase you are stuck somewhere.

