import { Box, Container, Stack, Typography } from '@mui/material'

type DataSectionWrapperProps = {
    title: string
    description: string
    background?: 'white' | 'grey'
    anchor?: string
    children: React.ReactNode
}

export const DataSectionWrapper: React.FC<DataSectionWrapperProps> = ({
    title,
    description,
    background = 'white',
    anchor,
    children,
}) => {
    return (
        <Box
            component="section"
            sx={{ backgroundColor: background === 'grey' ? 'background.default' : 'background.paper' }}
        >
            <Container sx={{ py: 6, maxWidth: 1340 }} maxWidth={false}>
                <Box>
                    <Typography variant="h4" component="h2" id={anchor} sx={{ scrollMarginTop: '124px' }}>
                        {title}
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1" color="text.primary">
                        {description}
                    </Typography>
                </Box>
                <Stack sx={{ mt: 3 }} spacing={3}>
                    {children}
                </Stack>
            </Container>
        </Box>
    )
}