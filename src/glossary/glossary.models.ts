import { BaseRequest } from '../models/request';

export interface IGlossaryTitleModel {
  rus: string;
  eng: string;
}

export interface IGlossaryModel {
  id: string;
  title: IGlossaryTitleModel;
  description: string;
}

export class GlossaryTitleModel implements IGlossaryTitleModel {
  constructor(public rus: string, public eng: string) { }
}

export class GlossaryRequest extends BaseRequest { }
