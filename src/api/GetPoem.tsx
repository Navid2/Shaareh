import { ApolloError, gql, useQuery } from "@apollo/client";
import { error } from "console";
import { useEffect, useState } from "react";
import { PoemVideoExplanation } from "../model/PoemVideoExplanation";
import { Verse } from "../model/Verse";

export const useGetPoemsExcerpt = () => {
	interface PoemVideoExplanationExcerptCategory {
		id: string;
		title: string;
		poems: PoemVideoExplanationExcerpt[];
	}
	interface PoemVideoExplanationExcerpt {
		id: string;
		title: string;
		created_at: string;
		cover: { url: string };
	}
	const query = gql`
		query {
			poemCategories(sort: "updated_at:desc", limit: 5) {
				id
				title
				poems(sort: "created_at:desc", limit: 10) {
					id
					title
					created_at
					cover {
						url
					}
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(query);
	const typedData: {
		poemCategories: PoemVideoExplanationExcerptCategory[];
	} = data;

	if (!loading && !error) {
		return { loading, error, categories: typedData.poemCategories };
	} else {
		return { loading, error, categories: null };
	}
};

export const useGetPoem = (id: string,setLoading:React.Dispatch<React.SetStateAction<boolean | undefined>>,setError:React.Dispatch<React.SetStateAction<ApolloError | undefined>>,setPoem:React.Dispatch<React.SetStateAction<PoemVideoExplanation | null | undefined>>) => {
	interface Poem {
		id: string;
		title: string;
		created_at: string;
		videoURL: string;
		verses: Verse[];
		videoSections: VideoSection[];
	}
	interface VideoSection {
		title: string;
		description: string;
		verseIndex: number;
		firstExplanation: boolean;
		time: SimpleTime & number;
		subsections: SubsectionWithSimpleTime[];
	}
	interface SubsectionWithSimpleTime {
		title: string;
		hour: number;
		minute: number;
		second: number;
		time: number;
	}
	interface SimpleTime {
		hour: number;
		minute: number;
		second: number;
	}
	const query = gql`
		query {
			poem(id: ${id} ) {
				id
				title
				created_at
				videoURL
				verses {
					hemistish_1
					hemistish_2
				}
				videoSections {
					title
					description
					verseIndex
					firstExplanation
					subsections {
						title
						hour
						minute
						second
					}
					time {
						hour
						minute
						second
					}
				}
			}
		}
	`;

	const { loading:_loading, error:_error, data:_data } = useQuery(query);
	

	
	
	let typedData: PoemVideoExplanation | null = null;
	if (!_loading && !_error) {
		const videoSections = (_data as { poem: Poem }).poem.videoSections.map(
			(videoSection) => {
				const subsections = videoSection?.subsections?.map(
					({ title, hour, minute, second }) => {
						return {
							title,
							time: hour * 60 * 60 + minute * 60 + second,
						};
					}
					);
					const time =
					videoSection.time.hour * 60 * 60 +
					videoSection.time.minute * 60 +
					videoSection.time.second;
					return { ...videoSection, time, subsections };
				}
				);
				
				typedData = { ...(_data as { poem: Poem }).poem, videoSections };
			}

			useEffect(()=>{
				setLoading(_loading);
				setError(_error);
				setPoem(typedData);
			},[_loading,_error,_data])

			
			return null;
		};
		