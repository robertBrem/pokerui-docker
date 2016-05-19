import {AccountPosition} from "../accountPosition/accountPosition";
import {TimeEntry} from "../accountPosition/timeentry";

export class Player {
  id:number;
  firstName:string;
  lastName:string;
  balance:string;
  currency:string;
  accountPositions:AccountPosition[];
  accountHistory:TimeEntry[];

  constructor() {
  }

}
