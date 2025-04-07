import axios from 'axios'

export interface searchResponse {
  documents: SearchModel[]
  meta: Meta
}

export interface SearchModel {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

export interface Meta {
  is_end: boolean
  pageable_count: number
  same_name: SameName
  total_count: number
}

export interface SameName {
  keyword: string
  region: any[]
  selected_region: string
}


// lng:number|null=null, lat:number|null=null
export const kakaoSearch = async (keyword: string,) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'KakaoAK ' + import.meta.env.VITE_KAKAO_REST
  }

  return axios.get<searchResponse>(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,{
    headers: headers,
  })

}
