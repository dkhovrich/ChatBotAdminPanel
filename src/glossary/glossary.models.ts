export interface IGlossaryMetaModel {
  text: boolean;
  picture: boolean;
  link: boolean;
}

export interface IGlossaryModel {
  id?: string;
  title: string;
  text: string;
  meta: IGlossaryMetaModel;
  related_titles: string[];
  keywords: string[];
  language: string;
  picture: string;
  link: string;
}
