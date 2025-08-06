package cn.torna.common.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.util.Collection;

/**
 * @author 六如
 */
@Getter
public class PushEvent extends ApplicationEvent {

    private final Long moduleId;
    private final Collection<Long> docIds;

    public PushEvent(Long moduleId, Collection<Long> docIds) {
        super(moduleId);
        this.moduleId = moduleId;
        this.docIds = docIds;
    }

}
