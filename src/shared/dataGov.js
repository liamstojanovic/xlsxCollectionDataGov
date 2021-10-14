const baseUrl = 'https://catalog.data.gov/api/3'
const paths = {
    tag_list: "/action/tag_list",
    status_show: "/action/status_show",
    package_list: "/action/package_list",
    package_search: "/action/package_search",
    package_show: "/action/package_show",
    package_activity_list: "/action/package_activity_list",
    package_activity_list_html: "/action/package_activity_list_html",
    package_autocomplete: "/action/package_autocomplete",
    package_relationship_list: "/action/package_relationships_list",
    package_revision_list: "/action/package_revision_list",
    organization_activity_list: "/action/organization_activity_list",
    organization_activity_list_html: "/action/organization_activity_list_html",
    organization_follower_count: "/action/organization_follower_count",
    organization_follower_list: "/action/organization_follower_list",
    organization_list_for_user:  "/action/organization_list_for_user",
    organization_revision_list: "/action/organization_revision_list",
    organization_show: "/action/organization_show",
    organization_list: "/action/organization_list",
    organization_autocomplete: "/action/organization_autocomplete",
    resource_search: "/action/resource_search",
    resource_show: "/action/resource_show",
    related_list: "/action/related_list"
}

module.exports = {
    baseUrl,
    paths
}