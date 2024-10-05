#include <stdio.h>
int mobile;

void level1()
{
printf("hi");
}
int main()
{ int id =1,uid,level,dlevel;
char type;
printf("new or existing(n/e)");
scanf("%c",&type);
if(type == 'e')
{
printf("enter your id");
scanf("%d",&uid);
 FILE *file = fopen("data.txt","r");
while(!feof(file))
  {

 fscanf(file,"id: %d level:%d\n" , &id, &level);
 if(id == uid)
   {printf("%d",level);
   dlevel = level;
   }
}
if(dlevel == 1)
{  level1();}
}
else 
{
  printf("enter new id");
scanf( "%d", &uid);
 FILE *file = fopen("data.txt","a"); 
 fprintf(file,"id: %d\n",uid) ;
 level1();
}
}
