import { gql, useQuery } from "@apollo/client";
import { PoemVideoExplanationCategory } from "../model/PoemVideoExplanationCategories";

export const useGetCategories = () => {
	const query = gql`
		query {
      poemCategories{
        id
        title
        cover{
          url
        }
        updated_at    
      }
		}
	`;
  
	const { loading, error, data } = useQuery(query);

	const typedData: {
		poemCategories:PoemVideoExplanationCategory[]
	} = data;

	if (!loading && !error) {
		return { loading, error, categories: typedData.poemCategories };
	} else {
		return { loading, error, categories: null };
	}
};
