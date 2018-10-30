// ---
//                            Global

export class APIData {

  constructor (data) {
    this._MaxPage = data.MaxPage;
    this._MinPage = data.MinPage;
    this._PageSize = data.PageSize;
    this._CurrentPage = data.CurrentPage;
    this._NextPage = data.NextPage;
    this._PrevPage = data.PrevPage;
    this._Content = data.Content;
  }

  get MaxPage ():number {
    return this._MaxPage;
  }

  get MinPage ():number {
    return this._MinPage;
  }

  get PageSize ():number {
    return this._PageSize;
  }

  get CurrentPage ():number {
    return this._CurrentPage;
  }

  get NextPage ():number {
    return this._NextPage;
  }

  get PrevPage ():number {
    return this._PrevPage;
  }

}

// ---
//               Templates & Samples

export class CompileException {
  CodeFile:String
  Exception:String
  Level:String
  LineNumber:Number
}

export class CompileResponse {
  IsSuccess:Boolean
  Exceptions:Array<CompileException>
  Activitystreamid:String
  SystemID:Number
  Streamauth:Object
}

export class Parameter {
  Min:Number
  Max:Number
  Inc:Number
  Name:String
  Value:Number
  Comment:String
  Code:String
}

export class CodeFile {
  get Name ():String {}

  get Code ():String {}

  get IsEdited ():boolean {}

  get Parameters ():Array<Parameter> {}

  get IsDeleted ():boolean {}
}

export class Template {
  ID:number
  ContainsErrors:boolean
  CreatedDT:String
  IsPublic:boolean
  Comment:String
  Name:String
  IsEnabled:boolean
  Group:String
  Type:String
  CodeFiles:Array<CodeFile>
  IsDeleted:boolean
}

export class Symbol {
  get ID ():number {}

  get Name ():String {}

  get StartDT ():String {}

  get EndDT ():String {}

  get Enabled ():boolean {}

  get TickSize ():number {}

  get PipValue ():number {}

  get LotSize ():number {}

  get CommissionLot ():number {}

  get CommissionOrder ():number {}

  get DefaultPipSlippage ():number {}

  get CategoryName ():String {}
}

export class Sample {
  get ID ():number {}

  get Symbol ():Symbol {}

  get Name ():String {}

  get Order ():number {}

  get Enabled ():boolean {}

  get StartDT ():String {}

  get EndDT ():String {}

  get AllowSystemCreation ():boolean {}

  get SampleType ():String {}
}

export class Test {
  get URL ():String {}

  get ID ():number {}

  get TestResult ():String {}

  get CreatedDT ():String {}

  get Comment ():String {}

  get IsCustom ():boolean {}

  get ResulStatistics ():Array {}

  get Templates ():Array<Template> {}

  get Samples ():Array<Sample> {}
}

export class BacktestHistory extends APIData {

  constructor (data) {
    super(data);
  }

  get Content ():Array<Test> {
    return this._Content;
  }

}

// ---
//                         Community

export class PostUser {
  get FullName ():String {}

  get AvatarURL ():String {}
}

export class CommunityPostReply {
  get Content ():String {}

  get CreatedDateUTC ():Date {}

  get ID ():String {}

  get Owner ():PostUser {}

  get ParentID ():String {}
}

export class CommunityPost {

  constructor (data) {
    this._PostID = data.PostID;
    this._Category = data.Category;
    this._CreatedDateUTC = data.CreatedDateUTC;
    this._Title = data.Title;
    this._Views = data.Views;
    this._Replies = data.Replies;
    this._Owner = data.Owner;
    this._LastReplyUser = data.LastReplyUser;
    this._LastReplyDateUTC = data.LastReplyDateUTC;
    this._Content = data.Content;
    this._TemplateType = data.TemplateType;
  }

  get PostID ():String {
    return this._PostID
  }

  get Category ():String {
    return this._Category
  }

  get CreatedDateUTC ():Date {
    return this._CreatedDateUTC
  }

  get Title ():String {
    return this._Title
  }

  get Views ():number {
    return this._Views
  }

  get Replies ():number {
    return this._Replies
  }

  get Owner ():PostUser {
    return this._Owner
  }

  get LastReplyUser ():PostUser {
    return this._LastReplyUser
  }

  get LastReplyDateUTC ():Date {
    return this._LastReplyDateUTC
  }

  get Content ():Array<CommunityPostReply> {
    return this._Content
  }

  get TemplateType ():any {
    return this._TemplateType
  }
}

export class CommunityData extends APIData {

  constructor (data) {
    super(data);
  }

  CurrentCategory
  CurrentType

  get Content ():Array<CommunityPost> {
    return this._Content;
  }

}

// ---
//                          Backtest

export class BacktestRunResult {
  Activitystreamid:String
  Exceptions:Array
  IsSuccess:Boolean
  Streamauth:String
  SystemID:String
}
