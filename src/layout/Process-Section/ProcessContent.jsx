import { Typography, Grid, Skeleton } from "@mui/material";

import { useQuery, useMutation, useQueryClient } from "react-query";

import MainCard from "components/MainCard";
import MUIImageCard from "components/common/MuiImageCard"

import { getFlowList, deleteFlowItem } from "services/flowListServices";

const ProcessContent = () => {

    const queryClient = useQueryClient();

    // Use react-query to fetch the flow list
    const { data: flowList, isLoading, error } = useQuery('flowList', getFlowList);

    // Mutation for deleting an item
    const deleteMutation = useMutation(deleteFlowItem, {
        onSuccess: () => {
            // Invalidate and refetch the flow list
            queryClient.invalidateQueries('flowList');
        },
    });

    const handleDelete = () => {
        console.log("Delete button clicked");
        deleteMutation.mutate(id);
    };

    const flowListData = flowList?.data

    return (
        <MainCard
            Title="Current Company Section"
        >
            <Typography
                variant='h4'
                gutterBottom
            >
                Current Processes Flow List
            </Typography>

            <Grid container spacing={3}>
                {/* loading state */}
                {isLoading ? (
                    Array.from({ length: flowListData?.length || 3 }).map((_, index) => (
                        <Grid item xs={4} key={index}>
                            <Skeleton
                                variant="rectangular"
                                height={140}
                            />
                            <MainCard>
                                <Skeleton width="100%" />
                            </MainCard>
                        </Grid>
                    ))
                ) : (
                    flowListData && flowListData.length > 0 ? (
                        flowListData.map(({ id, title, content, logo_url }) => (
                            <Grid item xs={4} key={id}>
                                <MUIImageCard
                                    imageSrc={logo_url ? logo_url : 'https://via.placeholder.com/150'}
                                    title={title}
                                    content={content}
                                    onDelete={handleDelete}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                align="center"
                            >
                                No data available
                            </Typography>
                        </Grid>
                    )
                )}
            </Grid>

        </MainCard>
    )
}

export default ProcessContent
