export type MovieDO = {
  title: string;
  overview: string;
  runtime: number;
  poster_path: string;
  credits: {
    cast: []
    crew: []
  };
}

export type PersonDO = {
  name: string;
  biography: string;
  place_of_birth: string;
  profile_path: string;
  movie_credits: {
    cast: []
    crew: []
  };
  tv_credits: {
    cast: []
    crew: []
  };
}

export type ShowDO = {
  name: string;
  overview: string;
  poster_path: string;
  number_of_seasons: number;
  number_of_episodes: number;
  credits: {
    cast: []
    crew: []
  };
}

export interface IMovieDS {
  getMovie: (id: number) => Promise<MovieDO | undefined>;
  getPerson: (id: number) => Promise<PersonDO | undefined>;
  getShow: (id: number) => Promise<ShowDO | undefined>;
  search: (query: string, type?: string) => Promise<any | undefined>;
}

export class TMDBMovieDS3 implements IMovieDS {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  baseUrl = "https://api.themoviedb.org/3/";

  getMovie = async (id: number) : Promise<MovieDO | undefined> => this.getDetail(id, 'movie', ["credits"]);
  getPerson = async (id: number) : Promise<PersonDO | undefined> => this.getDetail(id, 'person', ["movie_credits","tv_credits"]);
  getShow = async (id: number) : Promise<ShowDO | undefined> => this.getDetail(id, 'tv', ["credits"]);

  search = async (query: string, type: string = "multi") : Promise<any | undefined> => {
    return this.fetch(`search/${type}`, {"query": query});
  }

  protected getDetail = async (id: number, type: string, append: string[] = []) => {
    const appendToResponse = append.length > 0 ? {"append_to_response" : append.join(",")} : {};

    return this.fetch(`${type}/${id}`, appendToResponse);
  }

  protected fetch = async (path, params: {}) => {
    const query = this.objectToQueryString({
      "api_key": this.apiKey,
      ...params,
    });

    const url = this.baseUrl + path + '?' + query;

    return this.doFetch(url).then(res => res.json());
  }

  protected doFetch = async (url) => fetch(url);

  protected objectToQueryString = (obj) => {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
  }  
}