/* eslint-disable unused-imports/no-unused-vars */
interface Hero {
  img: string;
  path: string;
  btnTitle: string;
  title: string
  subtitle?: string;
}


interface Banner extends Hero {
  titleDescription: string
  subtitleDescription: string
}
/* eslint-enable unused-imports/no-unused-vars */