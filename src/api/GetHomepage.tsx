import { gql, useQuery } from "@apollo/client";

export const useGetHomepage = () => {
	const query = gql`
		query {
			homepage {
				title
				description
				keywords {
					keyword
					active
				}
			}
		}
	`;

	interface MetaKeyword {
		keyword: string;
		active: boolean;
	}

	interface HomepageData {
		title: string;
		description: string;
		keywords: MetaKeyword[];
	}

	const { loading, error, data } = useQuery(query);

	const typedData: {
		homepage: HomepageData;
	} = data;

	if (!loading && !error) {
		return { loading, error, homepage: typedData.homepage };
	} else {
		return { loading, error, homepage: null };
	}
};
