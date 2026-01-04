import React from 'react';
import { Skeleton, Container, Grid, Card } from '@mantine/core';

export const NewsSkeleton = () => (
    <Container size="xl" py="xl">
        <Grid>
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section>
                            <Skeleton height={200} />
                        </Card.Section>
                        <Skeleton height={20} mt="md" width="70%" />
                        <Skeleton height={15} mt="sm" />
                        <Skeleton height={15} mt="xs" />
                        <Skeleton height={15} mt="xs" width="50%" />
                        <Skeleton height={36} mt="xl" radius="md" width="40%" />
                    </Card>
                </Grid.Col>
            ))}
        </Grid>
    </Container>
);

export const MediaSkeleton = () => (
    <Container size="xl" py="xl">
        <Grid>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                    <Card shadow="sm" padding="xs" radius="md" withBorder>
                        <Card.Section>
                            <Skeleton height={180} />
                        </Card.Section>
                        <Skeleton height={20} mt="sm" width="80%" />
                        <Skeleton height={12} mt="xs" width="40%" />
                    </Card>
                </Grid.Col>
            ))}
        </Grid>
    </Container>
);

const SkeletonLoader: React.FC<{ type: 'news' | 'media' }> = ({ type }) => {
    return type === 'news' ? <NewsSkeleton /> : <MediaSkeleton />;
};

export default SkeletonLoader;
