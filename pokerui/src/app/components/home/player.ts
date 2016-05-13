export class Player {
  id:number;
  firstName:string;
  lastName:string;

  constructor() {
  }

  public toString = ():string => {
    console.log('toString');
    return this.firstName + ' ' + this.lastName;
  }

}
