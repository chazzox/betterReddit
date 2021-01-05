export default function getValues({
	is_self,
	selftext_html,
	is_video,
	post_hint,
	url,
	id,
	ups,
	title,
	subreddit_name_prefixed,
	author,
	num_comments,
	name,
	permalink,
	created_utc,
	saved,
	likes,
	is_gallery,
	gallery_data,
	thumbnail,
	url_overridden_by_dest,
	domain
}: ChildData): Post {
	return {
		is_self,
		selftext_html,
		is_video,
		post_hint,
		url,
		id,
		ups,
		title,
		subreddit_name_prefixed,
		author,
		num_comments,
		name,
		permalink,
		created_utc,
		saved,
		likes,
		is_gallery,
		gallery_data,
		thumbnail,
		url_overridden_by_dest,
		domain
	};
}
